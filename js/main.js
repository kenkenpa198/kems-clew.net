$(function () {
    $('#works').each(function () {

        // #works 要素がギャラリーのコンテナになる
        var $container = $(this);

        // オプションを設定して masonry を準備
        $container.masonry({
            itemSelector: '.works-item', // 要素のセレクタ
            columnWidth: 200,            // カラムの幅
            gutter: 16,                  // カラム間の左右の隙間
            fitWidth: 'true',            // 親の幅を自動調整して中央揃え
            transitionDuration: 'none'   // デフォルトの transition を削除（CSS と競合するため）
        });

        // JSON ファイルをリクエストして成功したら関数を実行
        $.getJSON('./data/content.json', function (data) {

            // ループで生成した DOM 要素を一時的に保存する配列
            var elements = [];

            // JSON の配列（data）の要素（item）ごとにループ処理
            $.each(data, function (i, item) {

                // 配列の要素から HTML 文字列を生成する
                var itemHTML =
                    '<li class="works-item is-loading">' +
                        '<a href="' + item.images.large + '">' +
                            '<img src="' + item.images.thumb + '" alt="' + item.title + '">' +
                        '</a>' +
                    '</li>';

                // HTML 文字列を DOM 要素化し、配列へ追加
                elements.push($(itemHTML).get(0));
            });

            // 降順で表示するため配列を逆順にする
            var elementsReverse = elements.reverse()

            // Home の場合は3つのみを表示する
            if ($('#home').length) {
                elementsReverse = elementsReverse.slice(0, 3)
            } 

            // DOM を挿入
            $container.append(elementsReverse);

            // 画像の読み込みが完了したら Masonry レイアウトを実行する
            $container.imagesLoaded(function () {
                $(elements).removeClass('is-loading');
                $container.masonry('appended', elements);
            });

        });
    });
});
