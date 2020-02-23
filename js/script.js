function main() {
    document.addEventListener("DOMContentLoaded", () => {
        chart();
    }, false);
};

function chart() {
    var ctx = document.getElementById('myChart').getContext('2d'),
        data = {
            datasets: [{
                data: [80, 15, 5],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 205, 86)',
                    'rgb(86, 205, 255)'
                ]
            }],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                "Web Development",
                "Database",
                "Graphic Design"
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