const { exec } = require('node:child_process');

class CPU {
    static nProcess = 1;
    static Processes = new Map();

    static getProcessByID(ID) {
        return this.Processes.get(ID);
    }

    static setProcess(Process) {
        let counter = 1, found = false;
        this.Processes.forEach(targetedProcess => {
            if(targetedProcess === Process) {
                this.Processes.set(counter, Process);
                found = true;
            }
            counter++;
        });

        if(!found) {
            this.nProcess++;
            this.Processes.set(this.nProcess, Process);
        }
    }

    static deleteProcessByID(ID) {
        return this.Processes.delete(ID);
    }

    static executeCommand(Command) {
        let outPut = null;
        exec(Command, (err, stdout, stderr) => {
            if(err) outPut = err;
            if(stdout) outPut = stdout;
            if(stderr) outPut = stderr;
        });

        return outPut;
    }
}

module.exports = CPU;