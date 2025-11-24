import { Card } from "antd";

export default function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="w-full mb-8">
            <h3 className="font-bold text-xl mb-3 text-blue-900">{title}</h3>
            <Card className="rounded-xl shadow p-6 bg-white">
                {children}
            </Card>
        </div>
    );
}
