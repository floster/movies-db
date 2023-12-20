<template>
  <header
    class="text-white mb-12 shadow-lg shadow-slate-300 dark:shadow-slate-950"
  >
    <div class="container px-3 h-16 mx-auto flex items-center">
      <NuxtImg
        src="/mdb-logo-dark.svg"
        alt="Movies DB Logo"
        class="h-6 dark:hidden"
      />
      <NuxtImg
        src="/mdb-logo.svg"
        alt="Movies DB Logo"
        class="h-6 hidden dark:block"
      />
      <div class="ml-auto">
        <UIThemeSwitcher />
      </div>
    </div>
  </header>
</template>
