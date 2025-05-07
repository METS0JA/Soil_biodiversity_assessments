// Initialize Vue with Vuetify
new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        title: 'Sequencing Cost Calculator',
        message: 'Configure your parameters and click Calculate',
        isBlue: true,
        
        // Form data
        poolingMethod: 'pooled', // Default value
        selectedOrganism: null,
        organisms: ['Animalia', 'Bacteria', 'Fungi'],
        numSites: 1,
        numSubsamples: 1,
        numReads: 10000,
        pricePerLibrary: 100,
        selectedPlatform: null,
        platforms: ['Illumina', 'Pacbio']
    },
    methods: {
        buttonClicked() {
            // Validate form
            if (!this.selectedOrganism || !this.selectedPlatform) {
                this.message = 'Please fill in all required fields';
                this.isBlue = false;
                return;
            }
            
            // In a real application, you would calculate something here
            // based on the input values
            const totalLibraries = this.poolingMethod === 'pooled' 
                ? this.numSites 
                : this.numSites * this.numSubsamples;
                
            const totalCost = totalLibraries * this.pricePerLibrary;
            
            this.message = `Assessment configured for ${this.selectedOrganism} using ${this.selectedPlatform}.\n` +
                          `Total cost estimate: $${totalCost} for ${totalLibraries} libraries.`;
            this.isBlue = true;
            
            console.log('Form submitted:', {
                poolingMethod: this.poolingMethod,
                organism: this.selectedOrganism,
                platform: this.selectedPlatform,
                sites: this.numSites,
                subsamples: this.numSubsamples,
                reads: this.numReads,
                pricePerLibrary: this.pricePerLibrary
            });
        }
    },
    mounted() {
        console.log('Vue app mounted successfully!');
    }
}); 