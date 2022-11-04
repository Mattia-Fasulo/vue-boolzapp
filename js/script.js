"use strict";


const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            activeChat: 0,
            newMessage: '',
            searchTerm: '',
            writing: false,
            online: false,
            chatDropdown: false,
            messageOption: {
                index: null,
                show: false
            },
            randomMessage: [
                'Va bene', 'Si, ah?', 'No, tu?', 'Ci vediamo sta sera?', 'Bene, tu?', 'Quando ci vediamo?', 'Andiamo al River?', 'Che si fa sta sera?', 'Ok, perfetto', 'Non saprei'
            ],
            contacts: [
                {
                    id: 1,
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 ',
                            hours: '15:30',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 ',
                            hours: '15:50',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 ',
                            hours: '16:15',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    id: 2,
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 ',
                            hours: '16:30',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 ',
                            hours: '16:30',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 ',
                            hours: '16:35',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    id: 3,
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 ',
                            hours: '10:10',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 ',
                            hours: '10:20',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 ',
                            hours: '16:15',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    id: 4,
                    name: 'Alessandro B.',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 ',
                            hours: '15:30',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 ',
                            hours: '15:50',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    id: 5,
                    name: 'Alessandro L.',
                    avatar: '_5',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 ',
                            hours: '15:30',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 ',
                            hours: '15:50',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    id: 6,
                    name: 'Claudia',
                    avatar: '_6',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 ',
                            hours: '15:30',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 ',
                            hours: '15:50',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 ',
                            hours: '15:51',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    id: 7,
                    name: 'Federico',
                    avatar: '_7',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 ',
                            hours: '15:30',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 ',
                            hours: '15:50',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
            ]
        }
    },
    methods: {
        consol(obj){
            console.log(obj.messages.length)
        },

        getLastMessage(item) {
            
                const lastMessages = item.messages;
                return lastMessages[lastMessages.length - 1];
            
        },

        setChat(id) {
            this.activeChat = this.contacts.findIndex((item) => id === item.id)
        },

        sendMessage() {
            if (!this.newMessage) return;
            this.writing = true;
            const d = new Date();
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            let newDate = d.toLocaleDateString('it-IT', options);
            let hours = d.getHours();
            let minutes = d.getMinutes();
            if (hours < 10) { hours = "0" + hours; };
            if (minutes < 10) { minutes = "0" + minutes; };
            const newMsg = {
                date: newDate,
                hours: hours + ':' + minutes,
                message: this.newMessage,
                status: 'sent'
            }
            this.contacts[this.activeChat].messages.push(newMsg);
            this.newMessage = '';

            //refs
            //fa questa azione dopo che ha renderizzato la pagina
            //con questo scrollo anche con il messaggio
            this.$nextTick(() => {
                // console.log(this.$refs.msg[this.$refs.msg.length - 1])
                const el = this.$refs.msg[this.$refs.msg.length - 1];
                el.scrollIntoView();
            })
            setTimeout(() => {
                this.writing = false;
                this.online = true;
                const d = new Date();
                const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
                let newDate = d.toLocaleDateString('it-IT', options);
                let hours = d.getHours();
                let minutes = d.getMinutes();
                if (hours < 10) { hours = "0" + hours; };
                if (minutes < 10) { minutes = "0" + minutes; };
                const newMsg = {
                    date: newDate,
                    hours: hours + ':' + minutes,
                    message: this.randomMessage[randomNumber(0, 9)],
                    status: 'received'
                }
                this.contacts[this.activeChat].messages.push(newMsg);

                //qui scrolla al messaggio ricevuto
                this.$nextTick(() => {
                    const el = this.$refs.msg[this.$refs.msg.length - 1];
                    el.scrollIntoView();
                })


            }, 3000),
                setTimeout(() => {
                    this.online = false;
                }, 6000)
        },
        showMessageOption(i) {
            this.messageOption.index = i;
            this.messageOption.show = !this.messageOption.show;
        },
        deleteMessage(i) {
            this.contacts[this.activeChat].messages.splice(i, 1);
            this.messageOption.show = !this.messageOption.show;
        },
        showChatOption() {
            this.chatDropdown = !this.chatDropdown;
        },
        deleteAllMessage() {
            this.contacts[this.activeChat].messages = [];
        },
        deleteChat(){
            this.contacts.splice(this.activeChat, 1);
            this.chatDropdown = false
        }

    },
    computed: {
        findContact() {
            return this.contacts.filter((item) => {
                const name = item.name.toLowerCase();
                return name.includes(this.searchTerm.toLowerCase());
            })
        }

    },
    mounted() {

    }
}).mount('#app')

