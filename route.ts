import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getOrderOtp } from "@/lib/nokos";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const order = await prisma.order.findFirst({
      where: { id: params.id, userId: (session.user as any).id },
    });

    if (!order) {
      return NextResponse.json({ error: "Order tidak ditemukan" }, { status: 404 });
    }

    if (!order.nokosOrderId) {
      return NextResponse.json({ success: true, order });
    }

    const res = await getOrderOtp(order.nokosOrderId);

    const status = (res?.data?.status || res?.status || order.status || "").toString().toUpperCase();
    const otp = res?.data?.otp || res?.otp || res?.code || res?.data?.code || null;
    const number = res?.data?.number || res?.number || order.number;

    const updated = await prisma.order.update({
      where: { id: order.id },
      data: {
        status,
        otp: otp ? String(otp) : order.otp,
        number: number ? String(number) : order.number,
      },
    });

    return NextResponse.json({ success: true, order: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
