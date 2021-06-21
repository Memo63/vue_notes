const EventBus = new Vue();

const NoteCountComp = {
    template: `
        <div>Anzahl der Notizen: {{noteCount}} </div>
    `,
    data(){
        return {
            noteCount :0
        }
    },
    created() {
        EventBus.$on('new-note', event => this.noteCount++);    }
}

const InputComponent = {
    template: `
        <input 
            type="text"
            class="form-control mt-2"
            :placeholder="placeholder"
            v-model="note"
            @keyup.enter="SubmitNote"
        >
    `,
    props: ['placeholder'],

    data(){
        return {
            note: ''
        }
    },

    methods: {
        SubmitNote() {
            EventBus.$emit('new-note', {
                note: this.note,
                timestamp: new Date().toLocaleString()
            });
            this.note='';
        }
    }
}

new Vue({

    el: '#app',

    components: {
        'input-component': InputComponent,
        'notecount-comp' : NoteCountComp
    },

    data: {
        notes: [],
        timestamps: [],
        placeholder: 'Gib hier eine neue Notiz ein:'
    },

    methods: {
        StoreNote(event) {
        this.notes.push(event.note);
        this.timestamps.push(event.timestamp);
        }   
    },
    created() {
        EventBus.$on('new-note', event => this.StoreNote(event));
    }

});