<script>
	import Timestamp from "../lib/Components/Timestamp.svelte";

	let timestamp2 = new Date(Date.now() + 60000);
</script>

<Timestamp />
<Timestamp date={timestamp2} />