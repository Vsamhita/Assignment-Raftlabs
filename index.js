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
    let dataBasedIsbn = findMagazineOrBookBasedIsbn();
    console.log("books or magazine based on isbn---->", dataBasedIsbn);  
    let dataBasedEmail = findBooksAndMagazineBasedEmail ();
    console.log("books and magazine based mail---->", dataBasedEmail);
    readlineSync.question('Please press enter to continue');
    let sortData = sortDataBasedTitle();
    console.log("data--->", sortData);
    (async () => {
      const csv = new ObjectsToCsv(magazines);
      // Save to file:
      await csv.toDisk('./magazines_export.csv'); 
      // Return the CSV file as string:
    })();
  });

  
  function findMagazineOrBookBasedIsbn (){
    let isbn = readlineSync.question('Please enter isbn: ');
    magazine_found = magazines.find(x=> x.isbn == isbn);
    if(magazine_found!= null){
      return magazine_found;
    }
    book_found = books.find(x=> x.isbn == isbn);
    if(book_found!= null){
      return book_found;
    }
    return 'Data not found';
  }

  function findBooksAndMagazineBasedEmail (){
    let name = readlineSync.question('Please enter authors email: ');
    book_found = books.filter(x=> x.authors == name);
    magazine_found = magazines.filter(x=> x.authors == name);
    if(magazine_found.length>0 && book_found.length>0){
      return book_found.concat(magazine_found);
    }
    return 'Data not found';
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
  

  

