
export function Shorten(string_to_split) {
  var bits = string_to_split.split("/")
  return bits[bits.length - 1]
}
