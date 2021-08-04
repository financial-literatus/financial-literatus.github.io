/**
     * Ref: 
     * https://regexr.com/3cr6f
     * https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript?page=1&tab=votes#tab-top
     * 
     * Thousands separators
     * 
     * The regex uses 2 lookahead assertions:
     * Positive Lookahead
     * Example: \d(?=px)
     * 1pt 2px 3em 4px
     * 
     * ?=(\d{3})
     * a positive one to look for any point in the string 
     * that has a multiple of 3 digits in a row after it,
     * 
     * ?!\d
     * Negative Lookahead
     * Example: \d(?!px)
     * 1pt 2px 3em 4px
     * 
     * a negative assertion to make sure that point only has 
     * exactly a multiple of 3 digits. 
     * 
     * The replacement expression in the formatter puts a comma there.
     * */

 export const inputNumberFormat = new RegExp(/\B(?=(\d{3})+(?!\d))/g);
 export const inputNumberParser = new RegExp(/\$\s?|(,*)/g);