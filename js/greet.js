class Greet extends Component {
    constructor() {
        super({
            selector: "greet",
            template: `
                    <article class="greet">
                        <input type="text" data-value="name">
                        <p>Hello my name is <span data-value="name"></span></p>
                        <input type="text" data-value="lastname">
                        <p>And my name is <span data-value="lastname"></span></p>
                        <input type="checkbox" data-value="flag">
                        <span data-value="flag"></span>
                    </article>`,
            data: {name:"Alan",lastname:"",flag:""},
            methods: {}
        });
    }
};
