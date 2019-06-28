<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>

</script>

<style>
	@import './assets/css/replace-elementui.css';
	html {
	  height: 100%;
	  margin: 0;
	  padding: 0;
	}
	body {
	  height: 100%;
	  margin: 0;
	  padding: 0;
	  font-family :"PingFang SC","Helvetica Neue","Hiragino Sans GB","Segoe UI","Microsoft YaHei","微软雅黑",sans-serif;
	}
	#app {
	  width: 100%;
	  height: 100%;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	}
	a {
	  text-decoration: none;
	}
</style>
