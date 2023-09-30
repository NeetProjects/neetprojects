/* ---------------------------------------------------*/
/* --------->>> Elementos dos Projetos <<<-----------*/
/* -------------------------------------------------*/
const LIST_PATH     = "/vn/list.json";

// Divs da página
var projectTitle    = $("#vn-title"     );
var projectImg      = $(".project-img"  );
var patchDownload   = $("#download_row" );
var projectInfo     = $(".project-info" );
var projectSinopse  = $(".sinopse"      );
var projectTags     = $(".vn-tags"      );
var projectProgress = $(".progress-area");
var projectGallery  = $("#gallery_row"  );

// Adicionar capa
function addCover(project) {
    var projectCover = $("<div>").append(
        $("<img>")
            .attr("src", `/vn/${project.id}/img/capa.png`)
            .addClass("img-fluid rounded b-shadow-a")
            .attr("alt", "")
    );
    projectImg.append(projectCover);
}

// Adicionar informações
function addInfos(project) {
    var dados = "ㅤ" + project.info;
    var infos = $("<p>").append(
        $("<img>")
            .attr("src", "/img/class-indi/" + project.peg + ".png")
            .attr("width", "40")
            .attr("height", "40")
            .attr("title", "Não recomendado para menores de" + project.peg + "anos"),
        dados
    );
    projectInfo.append(infos);
}

// Adicionar Sinopse
function addSinopse(project) {
    projectSinopse.append(project.sinop);
}

// Adicionar tags
function addTags(project) {
    var tags = project.tags;
    tags.forEach(function(tag) {
        var tagElem = $("<p>").text(tag);
        projectTags.append(tagElem);
    });
}

// Adicicionar botão e textos de download
function addDownload(project) {
    // Se NÃO tiver galeria:
    if (project.download == "") {
        var tbrText = $("<p>")
            .attr("align", "center")
            .append($("<strong>").html("<br>EM BREVE..."));
        patchDownload.append(tbrText);  // Botar texto na área de download
        return;                         // Fechar
    }
    // Se tiver:
    // Adicionar botão
    var downBut = $("<a>")
        .attr("href", project.download)
        .addClass("btn-download")
        .html('Baixar patch <i class="fas fa-cloud-arrow-down"></i>');
    // Adicionar aviso
    var copyText = $("<p>")
        .attr("align", "justify")
        .html("<strong>AVISO:</strong>\
                Este é um patch não oficial sem fins lucrativos\
                e de venda proibida que não inclui nenhuma cópia do jogo original.\
                Aplique-o em cópias devidamente adquiridas!"
        );

    patchDownload.append(downBut, copyText); // Botar na área de download
}

// Adicionar Barras de progresso
function addProgress(name, type) {
    projectProgress.append(
        $("<span>").html(name),
        $("<span>").addClass("pull-right").html(type + "%"),
        $("<div>")
            .addClass("progress")
            .append(
                $("<div>")
                    .addClass("progress-bar")
                    .attr("style", `width: ${type}%;`)
                    .attr("role", "progressbar")
                    .attr("aria-valuemin", "0")
                    .attr("aria-valuenow", type)
                    .attr("aria-valuemax", "100")
            )
    );
}

// Adicionar Galeria de Screenshots
function addGallery(project) {
    if (project.gallery !== "") {
        for (var i = 1; i < 7; i++) { // Ir do "print1" até "print6"
            var printPath = `/vn/${project.id}/img/print${i}.png`;
            var image = $("<div>")
                .addClass("col-sm-6 col-md-4")
                .attr("data-aos", "fade-up")
                .append(
                    $("<a>")
                        .addClass("lightbox")
                        .attr("href", printPath)
                        .append($("<img>").attr("src", printPath))
                );
            projectGallery.append(image);
        }
        baguetteBox.run(".print-gallery"); // Ativar galeria
    }
}



/* -------------------------------------------------*/
/* --------->>> Carregar os Detalhes <<<-----------*/
/* -----------------------------------------------*/
function loadProjectDetails() {
    $.getJSON(LIST_PATH, function(data) {

        $.each(data, function(index, project) {
            // Se o título na página não for o do projeto:
            if (projectTitle.text() !== project.title) {
                return; // Ignorar
            }
            // Adicionar elementos
            // ------------------------------------------------ // Elementos: ---------
            addInfos    (project);                              // Informações
            addCover    (project);                              // Capa
            addSinopse  (project);                              // Sinopse
            addDownload (project);                              // Área de download
            // ------------------------------------------------ // --------------------
            addTags     (project);                              // Tags
            addProgress ("Menus", project.menus);               // Progresso dos Menus
            addProgress ("Imagens e Vídeos", project.imgs);     // Progresso da Edição
            addProgress ("História", project.hist);             // Progresso da História
            addProgress ("Revisão", project.rev);               // Progresso do Revisão
            // ------------------------------------------------ // --------------------
            addGallery  (project);                              // Screenshots
        });
    });
}

// Executar ao carregar a página
$(document).ready(function() {
    loadProjectDetails();
});
