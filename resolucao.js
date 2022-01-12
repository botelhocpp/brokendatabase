//------------------------------------------------------------------------------
// resolucao.js
//------------------------------------------------------------------------------

/**
 * This code was designed to fix the requested JSON file. 
 * 
 * The program's input and output are given by the constants
 * "brokenDatabase" and "okDatabase", which contain the path
 * of the input and output files, respectively. The files are
 * contained in the database/ folder.
 * 
 * The program is responsive to the point of performing as
 * the required repairs and validations on any requested file,
 * as long as it has its name properly positioned in the
 * input constant.
 * 
 * This is guaranteed through simple error handling, which
 * increases the number of lines in the functions, but
 * introduces robustness.
 * 
 * Constant arrow functions were used to ensure code security
 * and to disregard the "this" context. Internal arrow functions
 * were also used to ensure code readability. Sometimes minimalist
 * versions of code are not possible, such as error handling and 
 * using the "for...in" structure to modify values ​​in an array.
 * 
 * @author Pedro M. Botelho
 * @since 12/01/2022
 */

//------------------------------------------------------------------------------
// Constant Variables 
//------------------------------------------------------------------------------

/**
 * An array with the string pairs used to correct the names
 * of the JSON file, consisting of the character to be replaced
 * and the new character.
 */
const namesCorrection = [[' æ', ' A'], [' ß', ' B'], [' ¢', ' C'], [' ø', ' O'], ['æ', 'a'], ['ß', 'b'], ['¢', 'c'], ['ø', 'o']];

/**
 * The input file. Contains the path of the JSON file to be fixed.
 */
const brokenDatabase = './database/broken-database.json';

/**
 * The Output file. Contains the path where the fixed JSON file will be.
 */
const okDatabase = './database/saida.json';

/**
 * Include the Node.js file system module, to allow the use of the
 * computer's file system.
 */
const fs = require('fs');

/**
 * Represents an error caused by a file that does not exist, cannot 
 * be accessed or has a compromised structure.
 */
const FileError = {
     name: "File Error",
     message: "The file does not exist, cannot be opened, or has a compromised structure."
}

//------------------------------------------------------------------------------
// NoSQL Database Functions 
//------------------------------------------------------------------------------

/**
 * Imports the desired database if it's a valid file path, or
 * descriptor, or throw an FileError otherwise. 
 * 
 * A simple try-catch block is being used to catch an error when
 * accessing an invalid JSON file and throw a FileError.
 * 
 * @param {string} database - The desired database relative path.
 * @returns The data of the JSON file, an array composed of objects.
 * @throws {FileError} - If the file does not exist, cannot 
 * be accessed or has a compromised structure.
 */
const importDatabase = (databaseFile) => {
     try {
          return JSON.parse(fs.readFileSync(databaseFile, 'utf-8'));
     }
     catch (fileError) {
          throw FileError;
     }
}

/**
 * Exports the raw data from the database to the specified file.
 * 
 * @param {string} databaseFile - The output file path, where the
 * fixed database will be.
 * @param {*} databaseRaw - The database to be exported, composed
 * of the objects.
 */
const exportDatabase = (databaseFile, databaseRaw) => {
     fs.writeFileSync(databaseFile, JSON.stringify(databaseRaw, null, 2));
}

//------------------------------------------------------------------------------
// Repair Functions 
//------------------------------------------------------------------------------

/**
 * Fixes "name" property values ​​of file objects. That is, it
 * searches the values ​​of the "name" property for a set of
 * characters that have been incorrectly placed and replaces
 * them with their respective substitutes.
 * 
 * The pairs of characters can be found in the "namesCorrection"
 * variable. 
 * 
 * They are: "æ" and "a", "ß" and "b", "¢" and "c", "ø" and "o".
 * 
 * If the character appears after a space(at the beginning of a
 * word) then the replacement character will be capitalized. If
 * it's in the middle of the word it will be in lower case.
 * 
 * @param {*} database - The list of objects, from the JSON file,
 * to be fixed.
 * @returns The data of the JSON file with the names fixed.
 */
const fixNames = (database) => {
     for (let i in database) {
          namesCorrection.forEach(correct => database[i]["name"] = database[i]["name"].replaceAll(correct[0], correct[1]));
     }
     return database;
}

/**
 * Fixes "price" property values of file objects. That is, it
 * searches the values of the "price" property for non-numbers
 * and change it's type to numbers.
 * 
 * That is, if any value of this property is a number in a string,
 * this function converts the string to a number.
 * 
 * @param {*} database - The list of objects, from the JSON file,
 * to be fixed. 
 * @returns The data of the JSON file with the prices fixed. 
 */
const fixPrices = (database) => {
     for (let i in database) {
          if (typeof database[i]["price"] != Number) {
               database[i]["price"] = Number(database[i]["price"]);
          }
     }
     return database;
}
/**
 * Fixes "quantity" property of file objects. That is, it checks
 * the objects for this property. If the object doesn't have this
 * property, it will be added to it, with a value zero.
 * 
 * @param {*} database - The list of objects, from the JSON file,
 * to be fixed. 
 * @returns The data of the JSON file with the quantities fixed.  
 */
const fixQuantities = (database) => {
     for (let i in database) {
          if (!database[i].hasOwnProperty("quantity")) {
               database[i]["quantity"] = 0;
          }
     }
     return database;
}

//------------------------------------------------------------------------------
// Validation Functions 
//------------------------------------------------------------------------------

/**
 * Validates database recovery by printing the list with all
 * product names.
 * 
 * Names are sorted first by category in alphabetical order,
 * forming a grouping by category. Each group is then sorted 
 * by id, in ascending order.
 * 
 * At the end the names are printed on the console. The title
 * text will be colored green, to highlight the validation step.
 * 
 * The "categories" variable, which stores an array of all
 * categories of the database products, without repetitions,
 * is used in this function to speed up and facilitate the
 * grouping process, identifying all possible categories.
 * 
 * @param {*} database - The list of objects, from the corrected 
 * JSON file, to be validated.
 * @param {*} categories - The list of valid database categories.
 */
const listProducts = (database, categories) => {

     let products = [];
     for(let cat of categories){
          products = products.concat(database
               .filter(item => item["category"] == cat)
               .sort((x, y) => x["id"] - y["id"])
               .map(item => item["name"]));
     }
     console.log("\033[0;32m%s\033[0m", "List of categorized and sorted products:");
     products.forEach(item => console.log(item));
}

/**
 * Validates the database retrieval by calculating the total
 * value of the stock by category, that is, by multiplying
 * the quantity of products in stock by their individual
 * value.
 * 
 * At the end it prints each category followed by the value
 * calculated for each one. The title text will be colored
 * green, to highlight the validation step.
 * 
 * The "categoryTotal" function takes a valid category, in
 * string format, and returns the total inventory value for
 * that category.
 * 
 * The "categories" variable, which stores an array of all
 * categories of the database products, without repetitions,
 * is used in this function to speed up and facilitate the
 * grouping process, identifying all possible categories.
 * 
 * @param {*} database - The list of objects, from the corrected 
 * JSON file, to be validated. 
 * @param {*} categories - The list of valid database categories.
 */
const stockValue = (database, categories) => {

     const categoryTotal = (category) => database
          .filter(item => item["category"] == category)
          .map(item => item["price"] * item["quantity"])
          .reduce((total, item) => total + item);

     console.log("\033[0;32m%s\033[0m", "\nTotal inventory value by category:");
     categories.forEach(cat => console.log(`Category ${cat}: R$${categoryTotal(cat).toFixed(2)}`));
}

//------------------------------------------------------------------------------
// Main Code
//------------------------------------------------------------------------------

try {
     // Recovery of the original database data:
     let databaseRaw = importDatabase(brokenDatabase);
     databaseRaw = fixNames(databaseRaw);
     databaseRaw = fixPrices(databaseRaw);
     databaseRaw = fixQuantities(databaseRaw);
     exportDatabase(okDatabase, databaseRaw);

     // Array of all categories of the database products.
     // Without repetitions: Use of Set class.
     const productCategories = (() => {
          let categories = new Set();
          databaseRaw.map(item => item["category"])
          .forEach(cat => categories.add(cat));
          return Array.from(categories).sort();
     })();

     // Database validation:
     listProducts(databaseRaw, productCategories);
     stockValue(databaseRaw, productCategories);
}
catch (fileError) {
     console.log(fileError.name + ": " + fileError.message);
}