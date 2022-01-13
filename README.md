# Broken Database 

## A Javascript program that recovers and validates a corrupted database.

<p align="center">
 <a href="#about">About</a> •
 <a href="#description">Description</a> •
 <a href="#running">Running</a> •
 <a href="#folders">Folders</a> • 
 <a href="#resources">Resources</a> • 
 <a href="#technologies">Technologies</a>
</p>

### About

This project was proposed by Rocky, as a step in the selection process for an internship in Web Analytics. The project was entirely done in Javascript, with some tools from Node.js, including running on the Node environment. To read the full report go to the doc/ folder.

### Description

The project focuses on one problem: recovering a NoSQL database, applying corrections to element properties, and exporting the corrected database at the end. There are three correction steps:

- Price Type Non-numeric.
- Names with weird characters.
- Products without the quantity property.

The program also performs the validation of the corrected data, ensuring that everything is in compliance. Validation is divided into two steps:

- Product names categorized and sorted by ID.
- Total value of stocks, by category.

The project also throws a file error, represented by a FileError object, if something is wrong with the system input. That is, if the system input file has its structure compromised, or if the program is unable to access it for some reason.

### Running

The resolucao.js file contains all the project code. To run the program, go to the code folder and write in the terminal:

```
$ node resolucao.js
```

If you run it from outside the folder it will throw a file error.

### Folders

- database: The database files, the corrupted and the fixed.
- doc: The full report of all parts of the "Broken Database" project, as well as the project proposal, issued by Rocky.
- latex: The LaTeX source code of the project report.

### Resources

- [x] Repair of product price types.
- [x] Retrieval of product names.
- [x] Product quantities repair.
- [x] Validation of product names.
- [x] Validation of product prices.
- [x] Minimal structure and interface.

### Technologies

The following tools were used in the project:

- [Javascript](https://www.javascript.com/)
- [Node.js](https://nodejs.org/en/)
