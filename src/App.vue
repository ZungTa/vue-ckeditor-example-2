<template>
    <div class="vue-container">
        <h1>Hello App.vue</h1>
        <div id="editor"></div>
        <button v-on:click="emptyEditor()">Empty the editor</button>
        <button v-on:click="save">save</button>
    </div>
</template>
<script>
import axios from "axios";
import ClassicEditor from "./pages/WrapCKEditor";

export default {
    data() {
        return {
            editorData: "<p>Hello</p>",
            // editorData: `<figure class="image"><img src="http://localhost:3000/images/1592214288937mongodb elematch 검색.jpg"><figcaption>gfdsgs</figcaption></figure><p>Hello</p>`,
            editorConfig: {
                // extraPlugins: [
                //     function(editor) {
                //         console.log("ewqeqw ediotr", editor.plugins);
                //         editor.plugins.get(
                //             "FileRepository"
                //         ).createUploadAdapter = loader => {
                //             return new MyUploadAdapter(loader);
                //         };
                //     }
                // ]
            }
        };
    },
    created() {},
    mounted() {
        ClassicEditor.create(document.querySelector("#editor")).catch(error =>
            console.error(error)
        );
    },
    methods: {
        emptyEditor() {
            this.editorData = "";
        },
        save() {
            console.log(this.editorData);
        }
    }
};

class MyUploadAdapter {
    constructor(loader) {
        console.log("constructor loader? ", loader);
        this.loader = loader;
    }

    upload() {
        console.log("MyUploadAdapter upload called", this.loader);

        return this.loader.file.then(file => {
            console.log("return loader.file");
            return new Promise((resolve, reject) => {
                console.log("file? ", file);
                const form = new FormData();

                form.append("img", file);
                axios
                    .post("http://localhost:3000/upload", form)
                    .then(async res => {
                        console.log("res? ", res);
                        const { data } = res;
                        const { filename } = data;

                        const getImage = await axios.get(
                            "http://localhost:3000/images/" + filename
                        );
                        console.log("getImage? ", getImage);

                        resolve({
                            default: "http://localhost:3000/images/" + filename
                        });
                    });

                // resolve();
            });
        });
    }

    abort() {
        console.log("abort");
    }
}
</script>