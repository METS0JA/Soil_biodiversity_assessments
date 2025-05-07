// Initialize Vue with Vuetify
new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        title: 'Experiment Cost Calculator',
        message: 'Configure your parameters and click Calculate',
        isBlue: true,
        
        // Form data
        selectedStrategy: null,
        poolingMethod: ['Soil pooling', 'Unpooled', 'DNA Pooling'],
        numSites: 1,
        numSamples: 9,
        pcrTime: 1,
        samplesPerRun: 1,
        dnaExtractionTime: 1,
        numberofSamplesExtraction: 24,
        personalHourRate: 0,
        poolingNumber: 9,

        // Consumables table
        consumableHeaders: [
            { text: 'Item', value: 'name', sortable: true },
            { text: 'Price ($)', value: 'price', sortable: true },
            { text: 'Total Volume', value: 'totalVolume', sortable: true },
            { text: 'Volume per Sample', value: 'volumePerSample', sortable: true },
            { text: '', value: 'actions', sortable: false }
        ],
        consumables: [],
        consumableDialog: false,
        editedIndex: -1,
        editedItem: {
            name: '',
            price: 0,
            totalVolume: 0,
            volumePerSample: 0
        },
        defaultItem: {
            name: '',
            price: 0,
            totalVolume: 0,
            volumePerSample: 0
        }
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Consumable' : 'Edit Consumable'
        }
    },
    methods: {
        buttonClicked() {
            // Validate form
            if (!this.selectedStrategy) {
                this.message = 'Please select a strategy';
                this.isBlue = false;
                return;
            }
            
           let nrOfSamplesForExtraction
           let nrOfSamplesForPCR

           if (this.selectedStrategy === 'Soil pooling') {
            nrOfSamplesForExtraction = this.numSites * this.numSamples / this.poolingNumber;
           } else {
            nrOfSamplesForExtraction = this.numSites * this.numSamples;
           }

           if (this.selectedStrategy === 'Unpooled') {
            nrOfSamplesForPCR = this.numSites * this.numSamples;
           } else {
            nrOfSamplesForPCR = this.numSites * this.numSamples / this.poolingNumber;
           }    
            
           let dnaExtractionHours = nrOfSamplesForExtraction / this.numberofSamplesExtraction * this.dnaExtractionTime;
           let pcrHours = nrOfSamplesForPCR / this.samplesPerRun * this.pcrTime;
           let laborCost = (pcrHours + dnaExtractionHours) * this.personalHourRate;
            
            this.message = `Total cost estimate: $${totalCost}\n` +
                          `Labor cost: $${laborCost} (${totalHours} hours)\n` +
                          `- DNA extraction: $${dnaExtractionHours * this.personalHourRate} (${dnaExtractionHours} hours)\n` +
                          `- PCR work: $${pcrHours * this.personalHourRate} (${pcrHours} hours)\n` +
                          `Consumables cost: $${consumablesCost} (${totalSamples} samples)`;
            this.isBlue = true;
            
            console.log('Form submitted:', {
                strategy: this.selectedStrategy,
                sites: this.numSites,
                samples: this.numSamples,
                totalSamples: totalSamples,
                totalHours: totalHours,
                dnaExtractionHours: dnaExtractionHours,
                pcrHours: totalHours - dnaExtractionHours,
                laborCost: laborCost,
                consumablesCost: consumablesCost,
                totalCost: totalCost
            });
        },

        // Consumables table methods
        addConsumable() {
            this.editedIndex = -1;
            this.editedItem = Object.assign({}, this.defaultItem);
            this.consumableDialog = true;
        },

        editConsumable(item) {
            this.editedIndex = this.consumables.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.consumableDialog = true;
        },

        deleteConsumable(item) {
            const index = this.consumables.indexOf(item);
            if (confirm('Are you sure you want to delete this item?')) {
                this.consumables.splice(index, 1);
            }
        },

        closeConsumableDialog() {
            this.consumableDialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        saveConsumable() {
            if (!this.editedItem.name || !this.editedItem.price || !this.editedItem.totalVolume || !this.editedItem.volumePerSample) {
                alert('Please fill in all fields');
                return;
            }

            if (this.editedIndex > -1) {
                Object.assign(this.consumables[this.editedIndex], this.editedItem);
            } else {
                this.consumables.push(this.editedItem);
            }
            this.closeConsumableDialog();
        },

        calculateConsumablesCost(totalSamples) {
            return this.consumables.reduce((total, item) => {
                const samplesPerItem = Math.floor(item.totalVolume / item.volumePerSample);
                const itemsNeeded = Math.ceil(totalSamples / samplesPerItem);
                return total + (itemsNeeded * item.price);
            }, 0);
        }
    },
    mounted() {
        console.log('app mounted successfully!');
    }
}); 