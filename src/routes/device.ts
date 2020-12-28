import { Router } from "express";
import { checkToken } from "../middlewares/jwt";

import { Device } from "../entities/Device";
import { RequestError } from "../express";

import { PowerState } from "tasmota-node";
const router = Router();

const getDeviceOrFail = async (id: string): Promise<Device> => {
    const device = await Device.findOne({ id });
    if (!device)
        throw new RequestError("Could not find device by that id", {}, 404);
    return device;
};

router.get("/:id", checkToken, async (req, res, next) => {
    try {
        const device = await getDeviceOrFail(req.params.id);

        res.json(await device.tasmotaInstance.power());
    } catch (error) {
        next(error);
    }
});

router.post("/", checkToken, async (req, res, next) => {
    try {
        const device = new Device(
            req.body.hostname,
            req.body.username,
            req.body.password
        );
        res.json((await device.save()).dataAsGuest());
    } catch (error) {
        next(error);
    }
});

router.patch(
    "/:id/power/:powerId/:powerState",
    checkToken,
    async (req, res, next) => {
        try {
            console.log(req.params.id);
            const device = await getDeviceOrFail(req.params.id);
            const powerId = parseInt(req.params.powerId);
            res.json(
                await device.tasmotaInstance.power(
                    req.params.powerState as PowerState,
                    powerId != 0 ? powerId : undefined
                )
            );
        } catch (error) {
            next(error);
        }
    }
);

router.delete("/:id", checkToken, async (req, res, next) => {
    try {
        const device = await getDeviceOrFail(req.params.id);
        const removedDevice = await device.remove();
        res.json(removedDevice);
    } catch (error) {
        next(error);
    }
});
export default router;
