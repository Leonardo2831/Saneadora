export default function titleTextCertidao(textInitialMatricula: string, matriculaNumber: string): string {
    return `<h2 class="text-3xl font-bold text-center text-gray-800">
                CERTIDÃO DE SITUAÇÃO JURÍDICA DE IMÓVEL
            </h2>
            <p class="text-base font-normal text-gray-700">Certifico, para os fins que se fizerem necessários, que a <u class="underline">situação jurídica atual do imóvel</u> objeto da <b class="font-semibold">Matrícula n° ${matriculaNumber} do Livro 2-Registro Geral</b>, abaixo indicado é a seguinte:</p>
            <p class="text-base font-normal text-gray-700">
                ${textInitialMatricula}
            </p>
        `;
}