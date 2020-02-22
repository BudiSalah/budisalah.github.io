function main() {
    document.addEventListener("DOMContentLoaded", () => {
        chart();
    }, false);
};

function chart() {
    var ctx = document.getElementById('myChart').getContext('2d'),
        data = {
            datasets: [{
                data: [90, 70, 35, 85, 65],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 64, 159)',
                    'rgb(255, 205, 86)',
                    'rgb(86, 205, 255)'
                ]
            }],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                "HTML, CSS, Sass, Bootstrap, Git",
                "Angular, Ionic, SQL",
                "C, Python, Linux, Php",
                "Javascript, Jquery, React JS",
                "Adobe CC"
            ]
        };

    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            maintainAspectRatio: false,
            legend: {
                position: "right"
            }
        }
    });
};

main();