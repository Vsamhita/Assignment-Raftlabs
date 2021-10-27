let csv = require('csv-parser');
let fs = require('fs');
let readlineSync = require('readline-sync');
let ObjectsToCsv = require('objects-to-csv');
let authors = [];
let books = [];
let magazines = [];

fs.createReadStream('./authors.csv')
  .pipe(csv({ separator: ';' }))
  .on('data', (row) => {
    authors.push(row);
  })
  .on('end', () => {
    authors.pop();
    console.log('CSV file for authors successfully processed', authors);
  });


  fs.createReadStream('./books.csv')
  .pipe(csv({ separator: ';' }))
  .on('data', (row) => {
      books.push(row);
  })
  .on('end', () => {
    books.pop();
    console.log('CSV file for books successfully processed', books); 
    books.push({
      title: 'dreams come true',
      isbn: '789-908',
      authors: 'samhita',
      description: 'gshjjjk thyrio'
    });

    (async () => {
      const csv = new ObjectsToCsv(books);
      // Save to file:
      await csv.toDisk('./books_export.csv'); 
      // Return the CSV file as string:
      console.log(await csv.toString());
    })();
  });



  fs.createReadStream('./magazines.csv')
  .pipe(csv({ separator: ';' }))
  .on('data', (row) => {
      magazines.push(row);
  })
  .on('end', () => {
    magazines.pop();
    console.log('CSV file for magazines successfully processed', magazines);
    magazines.push({
      title: 'dreams come true',
      isbn: '789-908',
      authors: 'samhita',
      publishedAt: '05.07.2011'
    });
    let booksBasedIsbn =  findBooksBasedIsbn();
    let magazineBasedIsbn = findMagazinesBasedIsbn();
    let magazineDataBasedEmail = findMagazinesBasedEmail();
    let booksDataBasedEmail = findBooksBasedEmail();
    console.log("books based on isbn---->", booksBasedIsbn);
    console.log("magazines based on isbn---->", magazineBasedIsbn);
    console.log("booksDataBasedEmail---->", booksDataBasedEmail);
    console.log("magazineDataBasedEmail---->", magazineDataBasedEmail);
    let sortData = sortDataBasedTitle();
    console.log("data--->", sortData);
    (async () => {
      const csv = new ObjectsToCsv(magazines);
      // Save to file:
      await csv.toDisk('./magazines_export.csv'); 
      // Return the CSV file as string:
      console.log(await csv.toString());
    })();
  });

  
  function findMagazinesBasedIsbn (){
    let isbn = readlineSync.question('Please enter isbn for book');
    return magazine_found = magazines.find(x=> x.isbn == isbn);
  }


  function findBooksBasedIsbn (){
    let isbn = readlineSync.question('Please enter isbn for magazine');
    return book_found = books.find(x=> x.isbn == isbn);
  }

  function findBooksBasedEmail (){
    let name = readlineSync.question('Please enter authors email for books');
    return book_found = books.find(x=> x.authors == name);
  }

  function findMagazinesBasedEmail (){
    let name = readlineSync.question('Please enter authors email for magazines');
    return magazine_found = magazines.find(x=> x.authors == name);
  }

  function sortDataBasedTitle (){
    let result = books.concat(magazines);
    return result.sort((a, b) => {
      if(a.title!= undefined && b.title!= undefined){
        let t1 =  a.title.toLowerCase(),
        t2 = b.title.toLowerCase();
        if (t1 < t2) {
          return -1;
        }
        if (t1 > t2) {
            return 1;
        }
        return 0;
      } 
    });
  }
  

  

