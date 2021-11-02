module.exports.randomNumber = () => {
    var n = 0;
    var numero;
    var uno = 0;
    var dos = 0;
    var tres = 3;
    do {
        numero = Math.floor((Math.random() * 50) + 1);
        if ((numero != uno) && (numero != dos) && (numero != 3)) {
            document.write(numero + "<br>");
            n++;
            if (n == 1) {
                uno = numero;
            }
            if (n == 2) {
                dos = numero;
            }
            if (n == 3) {
                tres = numero;
            }
        }
    }while (numero < 3);

    return {
        uno,
        dos,
        tres
    }

}