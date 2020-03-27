/* 
Copyright (c) 2020 Héctor Olvera Vital
Licensed under the MIT License
*/

class HashManager {
  /**
   * Convert String to md5 hash
   * @param {string} str - String with data
   * @return {string} Hash md5 string
   */
  md5(str) {
    let bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, str, Utilities.Charset.UTF_8)
    return Utilities.base64Encode(bytes);
  }

  /**
   * Convert String to sha1 hash
   * @param {string} str - String with data
   * @return {string} Hash sha1 string
   */
  sha1(str) {
    let bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_1, str, Utilities.Charset.UTF_8)
    return Utilities.base64Encode(bytes);
  }

  /**
   * Convert String to sha256 hash
   * @param {string} str - String with data
   * @return {string} Hash sha256 string
   */
  sha256(str) {
    let bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, str, Utilities.Charset.UTF_8)
    return Utilities.base64Encode(bytes);
  }
}