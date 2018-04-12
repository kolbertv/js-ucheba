let loadCatalogData = {
    init(data) {

        localStorage.setItem("catalogData", data);
        let dataParse = JSON.parse(localStorage["catalogData"]);


        console.log(dataParse);
    },
};