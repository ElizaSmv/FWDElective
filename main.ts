const number: HTMLElement = document.getElementById('num')!;
const getMemeBtn: HTMLElement = document.getElementById('get-meme-btn')!;
const memePic: HTMLImageElement = document.getElementById('get-meme-pic') as HTMLImageElement;
const alt: HTMLElement = document.getElementById('alt')!;
const title: HTMLElement = document.getElementById('title')!;
const date: HTMLElement = document.getElementById('date')!;
const mail: string = "e.semenova@innopolis.university";

const openNavBtn = document.getElementById('open-nav-button');
openNavBtn.addEventListener('click', openNav);
const closeNavBtn = document.getElementById('close-nav-button');
closeNavBtn.addEventListener('click', closeNav);


function openNav(): void {
    document.getElementById("mySidebar")!.style.width = "200px";
    document.getElementById("main")!.style.marginLeft = "200px";
}

function closeNav(): void {
    document.getElementById("mySidebar")!.style.width = "0";
    document.getElementById("main")!.style.marginLeft = "0";
}

async function getNumber(mail: string): Promise<number> {
    console.log('get-num');
    const params = new URLSearchParams();
    params.append('email', mail);
    return fetch('https://fwd.innopolis.app/api/hw2?' + params.toString())
        .then(res => res.json());
}

interface MemeData {
    title: string;
    img: string;
    year: number;
    month: number;
    day: number;
    alt: string;
}

async function generateMeme(n: number): Promise<MemeData> {
    console.log("get-meme", n);
    const params = new URLSearchParams();
    params.append('number', n.toString());
    return fetch(`https://getxkcd.vercel.app/api/comic?num=${n}`)
        .then(res => res.json());
}

async function parser(): Promise<void> {
    const n: number = await getNumber(mail);
    console.log(n);
    let data: MemeData = await generateMeme(n);
    title.textContent = data.title;
    memePic.src = data.img;
    console.log(memePic.src);
    let temp: Date = new Date(data.year, data.month - 1, data.day);
    date.textContent = 'Date: ' + temp.toLocaleDateString();
    alt.textContent = 'Text: ' + data.alt;
}

getMemeBtn.addEventListener('click', async function (e){
    console.log('get-number-button');
    await parser();
});

parser();