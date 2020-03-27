class HashManager {
  md5(str) {
    let bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, str, Utilities.Charset.UTF_8)
    return Utilities.base64Encode(bytes);
  }

  sha1(str) {
    let bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_1, str, Utilities.Charset.UTF_8)
    return Utilities.base64Encode(bytes);
  }

  sha256(str) {
    let bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, str, Utilities.Charset.UTF_8)
    return Utilities.base64Encode(bytes);
  }
}