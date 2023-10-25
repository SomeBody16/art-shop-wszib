<script lang="ts">
    import { writable } from 'svelte/store'
    import { InputNumber } from '../../base'

    export let name: string

    export let defaultValue: string = '0'
    export let value = defaultValue

    const numberValue = writable(parseFloat(value) / 100 || 0)
    const handleChange = (e: any) => numberValue.set(parseFloat(e.target.value))
</script>

<input type="number" style:display="none" {name} value={$numberValue * 100} />
<InputNumber {...$$props} name={`${name}_display`} value={$numberValue.toFixed(2)} on:change={handleChange} step="0.01">
    <slot slot="label" name="label" />
</InputNumber>
