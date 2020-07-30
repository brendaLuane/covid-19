formatNumberInt = (num) => {
    return new Intl.NumberFormat().format(num)
}

setDateToday = () => {
    let date = new Date
    date = date.toLocaleString('pt-BR')
    $(".today").html(date)
}

getTotWorld = () => {
    $.get("https://api.covid19api.com/world/total", function (data) {
        const tot = formatNumberInt(data.TotalConfirmed)
        $("#cases-world").html(tot)
    });
}

getTotBrasil = () => {
    $.get("https://api.covid19api.com/dayone/country/brazil/status/confirmed/live", function (data) {
        const tot = formatNumberInt(data[data.length - 1].Cases)
        $("#cases-brasil").html(tot)
    });
}

getAllCountries = () => {
    $.get("https://api.covid19api.com/summary", function (data) {
        const countries = data.Countries
        countries.sort(function (a, b) {
            return b.TotalConfirmed - a.TotalConfirmed
        })

        let html = ""
        for (let i = 0; i < 10; i++) {
            html += '<tr>' +
                '<td>' + (i + 1) + '</td>' +
                '<td>' + countries[i].Country + '</td>' +
                '<td>' + formatNumberInt(countries[i].TotalConfirmed) + '</td>' +
                '<td>' + formatNumberInt(countries[i].TotalDeaths) + '</td>' +
                '</tr>';
        }
        $("#body-ranking").html(html)
    });
}

getTotBrasil()
getTotWorld()
getAllCountries()
setDateToday()

setInterval(function () {
    getTotBrasil()
    getTotWorld()
    setDateToday()
}, 600000);
