    // ── Billeterie.js ──
   
   
        // ── Calculateur de total ──
        function updateTotal() {
            const select = document.getElementById('type-billet');
            const qty = parseInt(document.getElementById('qty').value) || 1;
            const price = parseInt(select.value) || 0;
            const total = price * qty;
            const label = select.options[select.selectedIndex]?.text?.split('—')[0]?.trim() || '';

            document.getElementById('total-amount').textContent = price
                ? total.toLocaleString('fr-FR') + ' XOF'
                : '— XOF';
            document.getElementById('total-detail').textContent = price
                ? `${label} × ${qty} billet${qty > 1 ? 's' : ''}`
                : 'Sélectionnez un billet';
        }

        function changeQty(delta) {
            const input = document.getElementById('qty');
            const current = parseInt(input.value) || 1;
            const next = Math.max(1, Math.min(10, current + delta));
            input.value = next;
            updateTotal();
        }

        
    