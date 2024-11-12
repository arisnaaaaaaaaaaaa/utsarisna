$(document).ready(function () {
    $('#shippingForm').submit(function (event) {
        event.preventDefault(); // Mencegah form untuk submit secara default

        // Ambil data dari form
        var origin = $('#origin').val();
        var destination = $('#destination').val();
        var weight = $('#weight').val();

        if (!origin || !destination || !weight) {
            alert('Semua kolom harus diisi!');
            return;
        }

        // Kirim data ke fungsi hitungEstimasiBiaya
        hitungEstimasiBiaya(origin, destination, weight);
    });
});

function hitungEstimasiBiaya(origin, destination, weight) {
    // Menghitung biaya pengiriman berdasarkan kota dan berat
    var biaya = 0;

    if (origin === destination) {
        $('#costEstimate').html('Kota asal dan kota tujuan tidak boleh sama.');
        return;
    }

    // Asumsi biaya pengiriman (harga per kg berdasarkan kota)
    var biayaPerKg = {
        "Jakarta": {
            "Bandung": 50000,
            "Surabaya": 150000,
            "Banyuwangi": 200000,
            "Denpasar": 250000
        },
        "Bandung": {
            "Jakarta": 50000,
            "Surabaya": 200000,
            "Banyuwangi": 2500000,
            "Denpasar": 300000
        },
        "Surabaya": {
            "Jakarta": 150000,
            "Bandung": 500000,
            "Banyuwangi": 200000,
            "Denpasar": 300000
        },
        "Banyuwangi": {
            "Jakarta": 200000,
            "Bandung": 2500000,
            "Surabaya": 200000,
            "Denpasar": 250000,
        },
        "Denpasar": {
            "Jakarta": 2500000,
            "Bandung": 300000,
            "Surabaya": 300000,
            "Banyuwangi": 250000,
        }
    };

    // Menghitung biaya
    if (biayaPerKg[origin] && biayaPerKg[origin][destination]) {
        biaya = biayaPerKg[origin][destination] * weight;
        $('#costEstimate').html('Estimasi Biaya Pengiriman: Rp ' + biaya);
    } else {
        $('#costEstimate').html('Biaya pengiriman tidak tersedia untuk kombinasi ini.');
    }
}
