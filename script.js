document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("dblclick", function(e) { e.preventDefault(); }, { passive: false });

    // 札を混ぜる
    let fudaOrder = [...fudalist];
    fudaOrder = shuffleArray(fudaOrder)

    let startTime;
    let currentFuda = 0;

    // HTML要素の取得
    const imageElement = document.getElementById('random-image');
    const reloadButton = document.getElementById('reload-button');
    const kimariji = document.getElementById('kimariji');
    const question = document.getElementById('question');
    const kimarijiButton = document.getElementById('kimariji-button');

    // 決まり字の表示
    // kimarijiButton.addEventListener('click', function() {
    //     if (window.getComputedStyle(kimariji).display === 'none') {
    //         kimariji.style.display = 'flex';
    //     }
    // });

    // 配列の先頭から100個をシャッフルする
    function shuffleArray(array) {
        for (let i = 99; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // タイマーの停止・リセット
    function stopTimer() {
        const elapsedTime = Date.now() - startTime;
        const seconds = Math.floor(elapsedTime / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        alert(`終わりです。${minutes}分${remainingSeconds}秒でした！`);

        resetPage();
    }

    // 最初からボタンクリック時のイベント
    function reloadPage(){
        let flag = window.confirm("最初の状態に戻りますが、いいですか？");
        if(flag) {
            resetPage();
        }
    }

    // 状態のリセット
    function resetPage(){
        imageElement.src = './torifuda/tori_0.png';
        kimariji.textContent = '';
        kimariji.style.display = 'none';
        question.style.display = 'none';
        currentFuda = 0;
        fudaOrder = shuffleArray(fudaOrder);
    }   

    // 札リストから選ばれた札を表示
    function displayFuda(order) {
        const fuda = fudaOrder[order];
        const isFlipped = Math.random() < 0.5;
        imageElement.src = isFlipped ? fuda.reverse : fuda.normal;

        // 決まり字は3つ前のものを表示
        if (order >= 3) {
            const fuda2back = fudaOrder[order - 3];
            document.getElementById('kimariji').textContent = fuda2back.kimariji;
        }
    }

    // 画像クリック時のイベント
    imageElement.addEventListener('click', () => {
        if (currentFuda === 0) {
            startTime = Date.now();
            displayFuda(currentFuda);
            currentFuda++;
        } else if (currentFuda === 103) {
            stopTimer();
        } else if (currentFuda === 2) {
            displayFuda(currentFuda);
            question.style.display = 'flex';
            currentFuda++;
        } else if (currentFuda === 3) {
            displayFuda(currentFuda);
            kimariji.style.display = 'flex';
            currentFuda++;
        } else {
            displayFuda(currentFuda);
            currentFuda++;
        }
    });

    // 最初からボタンクリックでリロードイベント
    reloadButton.addEventListener('click', reloadPage);
});