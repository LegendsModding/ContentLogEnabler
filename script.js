const base = Module.getBaseAddress("MinecraftLegends.Windows.exe");
console.log(`base: ${base.toString(16)}`);

Interceptor.attach(base.add(0xF295B0), {
    onEnter(args) {
        var logstr = args[3].readUtf8String();
        if (logstr.indexOf("%s") != -1) {
            logstr = logstr.replace("%s", args[4].readUtf8String());
        }

        console.log(`ContentLog: ${logstr}`);
    },
});