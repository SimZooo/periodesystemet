<script>
    let { data } = $props();
    let last_group = 0;
    let show_el = $state(false);
    let show_mpn = $state(false);
    let show_info = $state(false);
    let current_element = $state(data.elements[0].element);

    /**
     * @param {{ el: number; mpn: number; navn: string }} element
     */
    function calculateEl(element) {
        let saturation = 0;
        if (show_el) {
            saturation = 100 - (element.el / 5) * 100;
        } else if (show_mpn) {
            let mpn = (element.mpn - 0.983) * 100 * 25;
            saturation = 100 - mpn;
        }

        if (saturation == 0) {
            return "100%";
        }

        return saturation
    }

    /**
     * @param {number} group
     */
    function updateLastGroup(group) {
        last_group = group
    }

    /**
     * @param {any} el
     */
    function calculateElementBg(el) {
        return "background-color: hsl(240, 23%, " + calculateEl(el) + "%)"
    }

    /**
     * @param {{ navn: string; symbol: string; periode: number; gruppe: number; el: number; num: number; mpn: number; }} el
     */
    function elementClicked(el) {
        if (current_element.navn == el.navn) {
            current_element.navn = "undefined";
            show_info = false;
        }
        else {
            current_element = el;
            show_info = true;
        }
    }
    
    function createInfoText() {
        let header = current_element.navn;
        return header;
    }
</script>

<style>
.navn {
    opacity: 0;
    font-size: x-small;
}

.element {
    padding: 0;
    box-sizing:border-box;
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    transition: 0.5s;
    background-color: white;
    font-weight: bold;
    font-size: large;
}

.element-large {
    width: 7em;
    height: 7em;
    display: flex;
    place-self: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    transition: 0.5s;
    background-color: white;
    font-weight: bold;
    font-size: x-large;
    grid-column: 2 / 2;
}

.element:hover {
    transform: scale(2.0);
    z-index: 1000;
}

.element:hover .navn {
    transition: 0.5s;
    opacity: 1;
}

:global(body) {
    background-color: #272727;
    color: #272727;
    margin: 0;
    padding: 0;
}

:global(body::-webkit-scrollbar) {
    display: none;
}

* {
    padding: 0;
    margin: 0;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

#info {
    display: grid;
    place-self: center;
    align-items: center;
    font-weight: 600;
    width: 100%;
    height: 200px;
    background-color: #006AE5;
    grid-template: 1fr / repeat(5, 1fr) ;
    margin: 2% 0 2% 0;
}

#element-info {
    width: 100%;
    height: 100%;
    color: white;
    display: grid;
    grid-template: 1fr 2fr 1fr / 1fr;
}

#element-info div, h2 {
    display: flex;
    flex-direction: column;
}

#element-info h2 {
    justify-content: center;
    align-items: center;
    text-align: center;
    text-decoration-line: underline;
    text-decoration-color: white;
}

.periodesystem {
    display: grid;
    place-self: center;
    grid-template: repeat(7, 1fr) / repeat(18, 1fr);
    margin: 2% 0 2% 0;
    gap: 0;
}

button {
    border: solid #272727;
    padding: 10px;
    box-shadow: none;
    background-color: white;
    font-weight: bold;
    font-size: large;
}

#buttons {
    place-self: center;
    margin-bottom: 2%;
}
</style>

<div class="periodesystem">
    {#each data.elements as element}
    {#each {length: element.element.gruppe - last_group - 1}}
    <div></div>
    {/each}
    <button onclick={() => elementClicked(element.element)} class="element" 
        style={calculateElementBg(element.element)}>
        <p>{element.element.num}</p>
        <p>{element.element.symbol} </p>
        <p class="navn">{element.element.navn}</p>

        {updateLastGroup(element.element.gruppe)} 
    </button>
    {/each}
</div>
<div style="display: {show_info ? "grid" : "none"}" id="info">
    <div class="element-large">
        <p>{current_element.num}</p>
        <p>{current_element.symbol} </p>
        <p>{current_element.navn}</p>
    </div>
    <div id="element-info">
        <h2>{current_element.navn}</h2>
        <div>
            <h3>
                Atomnummer: {current_element.num}
            </h3>
            <h3>
                Elektronegativitet: {current_element.el}
            </h3>
            <h3>
                Masse-per-nukleon: {current_element.mpn}
            </h3>
        </div>
    </div>
</div>
<div id="buttons">
    <button onclick={() => {show_el = !show_el; show_mpn = false;}}> Elektronegativitet </button>
    <button onclick={() => {show_mpn = !show_mpn; show_el = false;}}> Masse-per-nukleon </button>
</div>