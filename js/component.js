class Component {
    constructor(structure = {
        selector: '',
        template: '',
        data: {},
        methods: {}
    }) {
        try {
            this.selector = `[data-component="${structure.selector}"]`;
            this.container = document.querySelector(this.selector);
            this.template = structure.template;
            this.methods = structure.methods;
            this.data = this.buildData(structure.data);
            this.mount();
        } catch (e) {
            console.log(e)
        }
    }
    buildData(data = {}) {
        var computedInitalData = {}
        this._data = data;
        for (const propertyName in data) {
            if (data.hasOwnProperty(propertyName)) {
                Object.defineProperty(computedInitalData, propertyName, {
                    set: function (x) {
                        this._data[propertyName] = x;
                        var toChange = this.container.querySelectorAll(`[data-value="${propertyName}"]`);
                        if (toChange) {
                            this.render(toChange, data[propertyName])
                        }
                    }.bind(this),
                    get: () => (this._data[propertyName])
                });
            }
        }
        return computedInitalData;
    }
    render(element = document.querySelector(this.selector), content = this.template) {
        if (Node.prototype.isPrototypeOf(element)) {
            if (element.tagName == "INPUT") {
                element.value = content;
            } else {
                element.innerHTML = content;
            }

        }
        if (NodeList.prototype.isPrototypeOf(element)) {
            element.forEach((child) => {
                this.render(child, content)
            });
        }
    }
    mount() {
        this.render(this.container, this.template);
        for (const key in this._data) {
            if (this.data.hasOwnProperty(key)) {
                var toChange = this.container.querySelectorAll(`[data-value="${key}"]`);
                if (toChange) {
                    this.render(toChange, this.data[key]);
                    toChange.forEach(element => {
                        if (element.tagName == 'INPUT') {
                                element.addEventListener('input', event=> {
                                this.data[key] = event.target.value;
                                })
                            if (element.getAttribute('type') == 'checkbox') {
                                    element.addEventListener('click', (click) => {
                                        this.data[key] = click.target.checked
                                        })
                                    }
                        }
                    });
                }
            }
        }
        const events = ['click']
        const DOMElements = events.map(event => {
            return {
                event: event,
                targets: this.container.querySelectorAll(`[data-event-${event}]`)
            };
        });
        for (const method in this.methods) {
            if (this.methods.hasOwnProperty(method)) {
                this.methods[method] = this.methods[method].bind(this);
            }
        }
        DOMElements.forEach(element => {
            element.targets.forEach(target => {
                target.addEventListener(element.event, this.methods[target.getAttribute('data-event-' + element.event)]);
            });
        });
    }
}