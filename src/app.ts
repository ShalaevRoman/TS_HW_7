showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt!.innerText = `Hello from ${name}`;
}

enum Category {
    Software,
    TypeScript,
    JavaScript
}

interface IBook {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
}

interface IMagazine {
    title: string;
    publisher: string;
}

const inventory: IBook[] = [
    { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software },
    { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
    { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
    { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software }
];

const numberArray: number[] = [1, 2, 3, 4, 5];
const stringArray: string[] = ['one', 'two', 'three', 'four', 'five'];

function purge<T>(inventory: T[]): T[] {
    return inventory.length >= 2 ? inventory.slice(2) : [];
}

console.log(purge(inventory));
console.log(purge(numberArray));

const purgeNumbers = purge<number>;

console.log(purgeNumbers(numberArray));
// console.log(purgeNumbers(stringArray)); // Викликає помилку тому що ми явно вказали дженерик number

interface ItemBook {
    title: string;
    id: number;
    author: string;
}

class Shelf<T extends ItemBook> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }
    getFirst(): T {
        return this.items[0];
    }
    printTitles(): void {
        this.items.forEach((item: T) => {
            console.log(item.title);
        });
    }

    find(searchTerm: string): T | undefined;
    find(searchTerm: number): T | undefined;
    find(searchTerm: string | number): T | undefined {
        if (typeof searchTerm === 'number') {
            return this.items.find(item => item.id === searchTerm);
        } else {
            return this.items.find(item => item.author === searchTerm);
        }
    }
}

class ShelfWithoutGenerics {
    private books: IBook[] = [];
    private magazines: IMagazine[] = [];

    addBook(book: IBook): void {
        this.books.push(book);
    }

    addMagazine(magazine: IMagazine): void {
        this.magazines.push(magazine);
    }

    getFirstBook(): IBook | undefined {
        return this.books[0];
    }

    getFirstMagazine(): IMagazine | undefined {
        return this.magazines[0];
    }
}

const bookShelf = new ShelfWithoutGenerics();

inventory.forEach(book => bookShelf.addBook(book));

const firstBookTitle = bookShelf.getFirstBook()?.title;

console.log(`The title of the first book on the shelf is: ${firstBookTitle}`);

const magazines: IMagazine[] = [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },
    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
    { title: 'Five Points', publisher: 'GSU' }
];

const magazineShelf = new ShelfWithoutGenerics();

magazines.forEach(magazine => magazineShelf.addMagazine(magazine));

const firstMagazineTitle = magazineShelf.getFirstMagazine()?.title;

console.log(`The title of the first book on the magazineShelf is: ${firstMagazineTitle}`);

interface CallbackFn<T> {
    (err: Error | null, data: T | null): void;
}

function myCallbackFunction(callback: CallbackFn<string>): void {
    const error: Error | null = null;
    const data: string | null = 'Data from myCallbackFunction';
    callback(error, data);
}

myCallbackFunction((err, data) => {
    if (err) {
        console.error(`Error: ${err.message}`);
    } else {
        console.log(`Callback data: ${data}`);
    }
});