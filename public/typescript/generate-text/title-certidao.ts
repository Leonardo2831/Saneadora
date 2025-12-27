export default function titleTextCertidao(textInitialMatricula: string): string {
    return `<h2 class="text-3xl font-bold text-center text-gray-800">
                CERTIDÃO DE SITUAÇÃO JURÍDICA DE IMÓVEL
            </h2>
            <p class="text-base font-normal text-gray-700">
                ${textInitialMatricula}
            </p>
        `;
}