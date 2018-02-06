import axios from '@/api/axios.config'
const API_URL = '/api/tlds'

export const domainService = {
  getTlds () {
    return new Promise((resolve, reject) => {
      axios.get(API_URL)
        .then(result => {
          if (result.data.status === 200) resolve(result.data.data)
          else reject(result.data.status)
        })
    })
  },
  /**
   * check if inserted text contains a tld code, and next generate domains depends on these tlds
   * @param text - inserted text
   * @returns {Promise}
   */
  getDomains (text) {
    return new Promise(resolve => {
      this.getTlds()
        .then(items => {
          let tlds = []
          items.forEach(item => {
            if (text.match(item.tld)) tlds.push(item)
          })
          resolve(this.generateDomainsForCountries(text, tlds))
        })
    })
  },
  /**
   * generate all possible domains
   * @param text - inserted text
   * @param countries - list of countries which are contained in the inserted text
   * @returns {Array}
   */
  generateDomainsForCountries (text, countries) {
    let domains = []
    countries.forEach(country => {
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
        if (domain.path.match(country.tld)) {
          f(domain.path)
        }
      })(text)
    })
    return domains
  }
}
