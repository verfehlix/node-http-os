# node-http-os
A very basic way to serve OS information in a time series as json via HTTP.
No security mechanisms etc, don't use with sensitive data. Use at your own risk.

### Configurable:
* The port http-os will listen on
* The update rate (how often the time series will be updated)
* The size of the time series (maximal amount of elements the time series can hold)

**Where:** In *http-os.js*, see `//config` comment

### What you will get:
```
[
    {
        "time": "19:06:21 - 13.02.2015.",
        "hostname": "hans-Desktop",
        "type": "Windows_XX",
        "platform": "win32",
        "uptime": 256074.2191481,
        "mem": {
            "free": 6461435904,
            "freePercent": "75.61",
            "total": 8545685504
        },
        "cpus": [
            {
                "model": "Intel(R) Core(TM) i99-2300 CPU @ 2.80GHz",
                "speed": 2794,
                "times": {
                    "user": 1925718,
                    "nice": 0,
                    "sys": 1047031,
                    "idle": 32064546,
                    "irq": 236750
                }
            },
            {
                "model": "Intel(R) Core(TM) i99-2300 CPU @ 2.80GHz",
                "speed": 2794,
                "times": {
                    "user": 1783843,
                    "nice": 0,
                    "sys": 783109,
                    "idle": 32470171,
                    "irq": 6937
                }
            },
            {
                "model": "Intel(R) Core(TM) i99-2300 CPU @ 2.80GHz",
                "speed": 2794,
                "times": {
                    "user": 1812312,
                    "nice": 0,
                    "sys": 669265,
                    "idle": 32555531,
                    "irq": 6343
                }
            },
            {
                "model": "Intel(R) Core(TM) i99-2300 CPU @ 2.80GHz",
                "speed": 2794,
                "times": {
                    "user": 1691046,
                    "nice": 0,
                    "sys": 654968,
                    "idle": 32691093,
                    "irq": 4953
                }
            }
        ],
        "loadavg": [
            0,
            0,
            0
        ]
    },
    {
        "time": "19:06:31 - 13.02.2015.",
        "hostname": "hans-Desktop",
        "type": "Windows_XX",
        "platform": "win32",
        "uptime": 256084.1748482,
        "mem": {
            "free": 6472916992,
            "freePercent": "75.74",
            "total": 8545685504
        },
        "cpus": [
            {
                "model": "Intel(R) Core(TM) i99-2300 CPU @ 2.80GHz",
                "speed": 2794,
                "times": {
                    "user": 1925734,
                    "nice": 0,
                    "sys": 1047078,
                    "idle": 32074437,
                    "irq": 236781
                }
            },
            {
                "model": "Intel(R) Core(TM) i99-2300 CPU @ 2.80GHz",
                "speed": 2794,
                "times": {
                    "user": 1783843,
                    "nice": 0,
                    "sys": 783171,
                    "idle": 32480062,
                    "irq": 6937
                }
            },
            {
                "model": "Intel(R) Core(TM) i99-2300 CPU @ 2.80GHz",
                "speed": 2794,
                "times": {
                    "user": 1812312,
                    "nice": 0,
                    "sys": 669359,
                    "idle": 32565390,
                    "irq": 6343
                }
            },
            {
                "model": "Intel(R) Core(TM) i99-2300 CPU @ 2.80GHz",
                "speed": 2794,
                "times": {
                    "user": 1691046,
                    "nice": 0,
                    "sys": 655062,
                    "idle": 32700953,
                    "irq": 4953
                }
            }
        ],
        "loadavg": [
            0,
            0,
            0
        ]
    }
]
```
