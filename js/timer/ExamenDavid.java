public static boolean esCreciente(int[] numeros) {
    boolean creciente = true;

    for (int i = 0; i < numeros.length; i++) {
        if (numeros[i] > numeros[i + 1]) {
            creciente = false;
        }
    }

    return creciente;
}