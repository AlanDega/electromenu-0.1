
/*
 * Transform string by adding newline after x spaces
 * parameter: String, Number
 * return: String
*/
const transformToNewline = (input,spaces=3) => {
    var space_count = 0
    var result = []
    var splitted_desc = input.split('')
    for (let i = 0; i < splitted_desc.length; i++) {
        result.push(splitted_desc[i])
        if (splitted_desc[i] === ' ') {
            ++space_count
            if (space_count % spaces === 0 && space_count !== 0)
                result.push('\n')
        }
    }
    return result.join('')
}

export { transformToNewline }