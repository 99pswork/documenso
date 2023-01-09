import type { NextApiRequest, NextApiResponse } from "next";

import { defaultHandler, defaultResponder } from "@documenso/lib/server";
import prisma from "@documenso/prisma";

type responseData = {
  status: string;
};

// Return a healthy 200 status code for uptime monitoring and render.com zero-downtime-deploy
async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  // A generic database access to make sure the service is healthy.
  const users = await prisma.user.findFirst();
  res.status(200).json({ message: "Api up and running :)" });
}

export default defaultHandler({
  GET: Promise.resolve({ default: defaultResponder(getHandler) }),
});
