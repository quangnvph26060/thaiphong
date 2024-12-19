<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<style>
    ul.file-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    ul.file-list li {
        float: left;
        margin: 5px;
        border: 1px solid #ddd;
        padding: 10px;
    }

    ul.file-list img {
        display: block;
        max-width: 0 auto;
    }

    ul.file-list li:hover {
        background-color: cornsilk;
        cursor: pointer;
    }
</style>

<body>


    <div id="fileExplorer">
        @foreach ($fileName as $file)
            <div class="thumbnail">
                <ul class="file-list">
                    <li>
                        <img src="{{ \Storage::url('images/' . $file) }}" alt="{{ $file }}"
                            title="{{ \Storage::url('images/' . $file) }}" width="120" height="130"> <br>
                        <span style="color: blue">{{ $file }}</span>
                    </li>
                </ul>
            </div>
        @endforeach
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="{{ asset('ckeditor/ckeditor.js') }}"></script>

    <script>
        $(document).ready(function() {
            var funcNum = "{{ $_GET['CKEditorFuncNum'] }}";


            $('#fileExplorer').on('click', 'img', function() {
                var fileUrl = $(this).attr('title');

                console.log(fileUrl);


                window.opener.CKEDITOR.tools.callFunction(funcNum, fileUrl);
                window.close();
            }).hover(function() {
                $(this).css('cursor', 'pointer');
            })

        })
    </script>
</body>

</html>
