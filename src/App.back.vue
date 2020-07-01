<template>
    <div class="vue-container">
        <h1>Hello App.vue</h1>
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
        <button v-on:click="emptyEditor()">Empty the editor</button>
    </div>
</template>
<script>
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import UploadAdapter from "@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter";
// import Image from "@ckeditor/ckeditor5-image/src/image";
// import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
// import CodeBlock from "@ckeditor/ckeditor5-code-block/src/codeblock";

export default {
    data() {
        return {
            editor: ClassicEditor,
            editorData: "<p>Content of the editor.</p>",
            editorConfig: {
                // plugins: [CodeBlock],
                // toolbar: {
                // items: ["image"]
                // }
                // toolbar: ["bold", "italic", "|", "link", "imageUpload"],
                toolbar: [
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "link",
                    "bulletedList",
                    "numberedList",
                    "|",
                    "indent",
                    "outdent",
                    "|",
                    "imageUpload",
                    "blockQuote",
                    "insertTable",
                    "mediaEmbed",
                    "undo",
                    "redo",
                    "alignment",
                    "codeBlock"
                ],
                image: {
                    toolbar: [
                        "imageStyle:full",
                        "imageStyle:side",
                        "|",
                        "imageTextAlternative"
                    ]
                }
            }
        };
    },
    methods: {
        emptyEditor() {
            this.editorData = "";
        }
    }
};
</script>