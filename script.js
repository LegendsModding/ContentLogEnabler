const mod = Process.enumerateModules()[0];
console.log(`base: ${mod.base.toString(16)}`);

const results = Memory.scanSync(mod.base, mod.size, "44 89 44 24 18 4C 89 4C 24 20");
if (results.length <= 0) {
    console.log("Did not find required function in executable.");
} else {
    Interceptor.attach(results[0].address, {
        onEnter(args) {
            var logstr = args[3].readUtf8String();
            if (logstr.indexOf("%s") != -1) {
                logstr = logstr.replace("%s", args[4].readUtf8String());
            }

            console.log(`ContentLog: ${logstr}`);
        },
    });
}
