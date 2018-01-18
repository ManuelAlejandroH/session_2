class Clock extends Component {
    constructor() {
        super({
            selector: "clock",
            template: `
                    <article class="reloj">
                        <section class="display">
                            <span class="hours" data-value="hours">0</span>
                            <span class="minutes" data-value="minutes">0</span>
                            <span class="seconds" data-value="seconds">0</span>
                        </section>
                        <section class="controls">
                            <button data-event-click="startClock">Start</button>
                            <button data-event-click="pauseClock">Pause</button>
                            <button data-event-click="stopClock">Stop</button>
                        </section>
                    </article>`,
            data: {
                seconds: 0,
                minutes: 0,
                hours: 0
            },
            methods: {
                updateClock() {
                    if (this.data.seconds < 59) {
                        this.data.seconds++;
                    } else {
                        this.data.seconds = 0;
                        this.data.minutes++;
                    }
                    if (this.data.minutes >= 60) {
                        this.data.minutes = 0;
                        this.data.hours++;
                    }
                },
                startClock() {
                    if (!this.data.clockId) {
                        this.data.clockId = setInterval(function () {
                            this.methods.updateClock();
                        }.bind(this), 100);
                    }

                },
                pauseClock() {
                    clearInterval(this.data.clockId)
                    this.data.clockId = 0;
                },
                stopClock() {
                    clearInterval(this.data.clockId)
                    this.data.seconds = 0;
                    this.data.minutes = 0;
                    this.data.hours = 0;
                    this.data.clockId = 0;
                }
            }
        });
    }
};
