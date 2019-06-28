<template>
	<div id='app'>
		<div id="localBar">
			<hr id="line"/>
		</div>
	</div>
</template>

<script>
	import Bar from './Bar.vue'
	export default {
		name: 'app',
		components: {
			Bar,
		},
		data() {
			return {

			}
		}
	}
</script>

<style>
	
	#line {
		width: 400px;
		left: 37%;
		top: 200px;
		position: fixed;
		/* position: fixed;
		width: 80%;
		top: 50px;
		left: 100px;
		right: 0px;
		bottom: 0px; */
	}
	#localBar {
		position: fixed;
		width: 9%;
		top: 100px;
		left: 0px;
		right: 90%;
		bottom: 0px;
		margin: auto;
		z-index: 3;
	}
</style>
