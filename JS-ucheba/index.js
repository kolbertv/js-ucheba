function farengeit() {
    let a = prompt('Веедите число в цельсиях');
    let tf = 9 / 5 * a + 32;
    alert(tf);
}

function console_name() {
    let admin;
    let name = 'Василий';
    admin = name;
    console.log(admin);
}

function console_virajenie() {
    console.log('Сложение двух цифр 10 и прибавление к ним текста "10"');
    console.log(10 + 10 + "10");
    console.log('Сложение цифры 10 текста "10" и цифры 10');
    console.log(10 + "10" + 10);
    console.log('Сложение двух цифр 10 преобразование текста "10" в цифру 10 и сложение');
    console.log(10 + 10 + +"10");
    console.log('деление на 0');
    console.log(10 / -"");
    console.log('из-за того что вместо точки запятая, текст "2,5" не преобразовывается в число, потому резльутат Not a Number');
    console.log(10 / +"2,5");
}

// defer - грузит файлы JS не препятсвуюя загрузке
// основной странице HTML в ожидании загрузки файлов JS,
// но JS файлы грузит последовательно в порядке очереди
// и не начинает загрузку нового JS не загрузив предыдущий

// async - тоже, что и defer, но грузит все js файлы парарельно
// не ожидая загрузки предыдущих.

function lottary_ticket() {
    let a = prompt("введите номер билета 6 цифр ХХХХХХ");
    let b = a.split("");
    let c = 0;
    let d = 0;
    console.log(b);
    for (let i = 0; i <= 5; i++) {
        if (i <= 2) {
            c = c + parseInt(b[i]);
        }
        if (i > 2 && i <= 5) {
            d = d + parseInt(b[i]);
        }
    }
    if (c === d) {
        console.log("билет выиграл");

    } else {
        console.log("билет не выиграл");
    }
    console.log("куда применить % я не понял, потому просто вывел в консоль :)");
}