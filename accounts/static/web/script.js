console.log('Script loaded and executed');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired');
    const table = document.querySelector('.tg');
    const rows = table.querySelectorAll('tbody tr');

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        cells.forEach((cell, index) => {
            if (index < 3) { // Only make the first 3 columns editable
                cell.contentEditable = true;
                cell.addEventListener('input', updateRow);
            }
        });
    });

    function updateRow() {
        const row = this.closest('tr');
        const cells = row.querySelectorAll('td');
        
        const grossPay = parseFloat(cells[0].textContent) || 0;
        const systemAmount = parseFloat(cells[1].textContent) || 0;
        const hdmfAmount = parseFloat(cells[2].textContent) || 0;
        
        const checking = grossPay - systemAmount - hdmfAmount;
        cells[3].textContent = checking.toFixed(2);
        
        updateTotal();
    }

    function updateTotal() {
        let totalGrossPay = 0;
        let totalSystemAmount = 0;
        let totalHDMFAmount = 0;
        let totalChecking = 0;

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            totalGrossPay += parseFloat(cells[0].textContent) || 0;
            totalSystemAmount += parseFloat(cells[1].textContent) || 0;
            totalHDMFAmount += parseFloat(cells[2].textContent) || 0;
            totalChecking += parseFloat(cells[3].textContent) || 0;
        });

        const totalRow = table.querySelector('tfoot tr');
        if (!totalRow) {
            const tfoot = document.createElement('tfoot');
            tfoot.innerHTML = `
                <tr>
                    <td><strong>Total:</strong></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            `;
            table.appendChild(tfoot);
        }

        const totalCells = table.querySelectorAll('tfoot td');
        totalCells[1].textContent = totalGrossPay.toFixed(2);
        totalCells[2].textContent = totalSystemAmount.toFixed(2);
        totalCells[3].textContent = totalHDMFAmount.toFixed(2);
        totalCells[4].textContent = totalChecking.toFixed(2);
    }
});
