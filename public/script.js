document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const amount = document.getElementById('amount').value;
    const percentage = document.getElementById('percentage').value;
    const notes = document.getElementById('notes').value;

    const tip = {
        date: date,
        amount: amount,
        percentage: percentage,
        notes: notes
    };

    fetch('/api/tips', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tip)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        displayTrends();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

function displayTrends() {
    fetch('/api/tips')
    .then(response => response.json())
    .then(tips => {
        const tipsList = document.getElementById('tipsList');
        tipsList.innerHTML = '';
        tips.forEach(tip => {
            const tipItem = document.createElement('ul');
            tipItem.style.listStyleType = 'none';

            const amountItem = document.createElement('li');
            amountItem.innerHTML = `<span class="key">Amount:</span> $${tip.amount}`;
            tipItem.appendChild(amountItem);

            const dateItem = document.createElement('li');
            dateItem.innerHTML = `<span class="key">Date:</span> ${new Date(tip.date).toLocaleDateString()}`;
            tipItem.appendChild(dateItem);

            const percentageItem = document.createElement('li');
            percentageItem.innerHTML = `<span class="key">Percentage:</span> ${tip.percentage}%`;
            tipItem.appendChild(percentageItem);

            const notesItem = document.createElement('li');
            notesItem.innerHTML = `<span class="key">Notes:</span> ${tip.notes}`;
            tipItem.appendChild(notesItem);

            tipsList.appendChild(tipItem);
        });
    })
    .catch((error) => {
        console.error('Error', error);
    });
}

displayTrends();