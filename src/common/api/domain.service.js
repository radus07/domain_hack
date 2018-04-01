import {TldService} from '../api.service'

export const DomainService = {
  /**
   * Check if inserted text contains a tld code, and next generate domains depends on these tlds
   * @param text - inserted text
   * @returns {Promise}
   */
  async getAll (text) {
    const items = await TldService.getAll()
    const countries = items.filter(item => text.match(item.tld))
    return Promise.resolve(generateDomainsForCountries(text, countries))
  }
}

/**
 * Generate all possible domains
 * @param text - inserted text
 * @param countries - list of countries which are contained in the inserted text
 * @returns {Array}
 */
const generateDomainsForCountries = (text, countries) => {
  let domains = []
  countries.map(country => {
    let tempDomain = {name: '', tld: ''};
    (function f (word) {
      const tldIndex = word.indexOf(country.tld)
      const domain = {
        name: tempDomain.name + tempDomain.tld + word.substring(0, tldIndex),
        tld: country.tld,
        path: word.substring((tldIndex + country.tld.length), word.length),
        country: country.country
      }
      tempDomain = Object.assign({}, domain)
      domains.push(domain)
      if (domain.path.match(country.tld)) f(domain.path)
    })(text)
  })
  return domains
}
